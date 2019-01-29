<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Group;
use App\Entity\User;
use App\Form\GroupType;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as CF;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GroupApiController.
 *
 * @Route("/api/groups")
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class GroupApiController extends AbstractController
{
    /**
     * @Route("", methods={"GET"})
     */
    public function getGroups(EntityManagerInterface $entityManager): Response
    {
        $groups = $entityManager->getRepository(Group::class)->findAll();

        return new JsonResponse($groups);
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("group", class="App\Entity\Group")
     */
    public function getGroup(Group $group): Response
    {
        return new JsonResponse($group);
    }

    /**
     * @Route("/{id}", methods={"PATCH"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("group", class="App\Entity\Group")
     */
    public function editGroup(Group $group, Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(GroupType::class, $group, ['method' => Request::METHOD_PATCH]);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $entityManager->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/{id}", methods={"DELETE"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("group", class="App\Entity\Group")
     */
    public function deleteGroup(Group $group, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($group);
        $entityManager->flush();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function addGroup(EntityManagerInterface $entityManager, Request $request): Response
    {
        $group = new Group();
        $form = $this->createForm(GroupType::class, $group);

        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $entityManager->persist($group);
            $entityManager->flush();

            return new JsonResponse($group);
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}

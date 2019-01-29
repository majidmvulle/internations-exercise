<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
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
 * @Route("/api/users")
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class UserApiController extends AbstractController
{
    /**
     * @Route("", methods={"GET"})
     */
    public function getUsers(EntityManagerInterface $entityManager): Response
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        return new JsonResponse($users);
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("user", class="App\Entity\User")
     */
    public function getAUser(User $user): Response
    {
        return new JsonResponse($user);
    }

    /**
     * @Route("/{id}", methods={"PATCH"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("user", class="App\Entity\User")
     */
    public function editUser(User $user, Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserType::class, $user, ['method' => Request::METHOD_PATCH]);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $entityManager->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Route("/{id}", methods={"DELETE"}, requirements={"id": "\d+"})
     * @CF\ParamConverter("user", class="App\Entity\User")
     */
    public function deleteUser(User $user, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($user);
        $entityManager->flush();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function addUser(EntityManagerInterface $entityManager, Request $request): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        $form->submit(json_decode($request->getContent(), true));

        if($form->isValid()){
            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse($user);
        }

        return new JsonResponse($form->getErrors(), Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}

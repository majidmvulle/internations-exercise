<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DefaultController.
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class DefaultController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }
}

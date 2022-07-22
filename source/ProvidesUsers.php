<?php

interface ProvidesUsers
{
    public function findOne(int $id): ?User;

    public function findOneByMail(string $email): ?User;

    public function persist(User $user): void;
}
const express = require('express');
const prisma = require('../../database/prisma_client');

async function PostIAController(req, res)
{
    const { text } = req.body

    const python = spawn('python', ['IA-DetecdetFake.py', text]);

    let dataTosend;

    
}
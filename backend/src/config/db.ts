import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

// Simple Prisma client setup for the ecommerce project 0

const prisma = new PrismaClient()

export const connectToDB = async () => {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Failed to connect to database:', error)
  }
}

export default prisma


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Workers
  const worker1 = await prisma.worker.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'John Doe',
      skillType: 'Electrician',
      dailyCapacity: 8,
      availability: true,
    },
  })

  const worker2 = await prisma.worker.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Jane Smith',
      skillType: 'Plumber',
      dailyCapacity: 8,
      availability: true,
    },
  })

  const worker3 = await prisma.worker.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Bob Builder',
      skillType: 'Carpenter',
      dailyCapacity: 8,
      availability: true,
    },
  })

  // Create Project
  const project1 = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Downtown Office Complex',
      location: '123 Main St',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      type: 'Commercial',
      status: 'Active',
    },
  })

  // Create Tasks
  const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      projectId: project1.id,
      name: 'Wiring Layout',
      skillRequired: 'Electrician',
      priority: 2,
      status: 'Pending',
      startDate: new Date('2023-02-01'),
      estimatedDuration: 5,
      completion: 0,
    },
  })

  const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      projectId: project1.id,
      name: 'Plumbing Installation',
      skillRequired: 'Plumber',
      priority: 1,
      status: 'Pending',
      startDate: new Date('2023-02-10'),
      estimatedDuration: 7,
      completion: 0,
    },
  })

  console.log({ worker1, worker2, worker3, project1, task1, task2 })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres://lndata:123123@localhost:5433/lndata')

export { db }
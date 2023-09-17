import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}
  async getAccounts(where: Prisma.AccountWhereInput) {
    return this.prisma.account.findMany({
      where: where,
    });
  }
  async getAccount(where: Prisma.AccountWhereUniqueInput) {
    return this.prisma.account.findUnique({
      where: where,
    });
  }
  async createAccount(data: Prisma.AccountCreateInput) {
    return this.prisma.account.create({
      data,
    });
  }
  async updateAccount(id: number, data: Prisma.AccountUpdateInput) {
    return this.prisma.account.update({
      where: { id: id },
      data,
    });
  }
  async deleteAccount(id: number) {
    return this.prisma.account.delete({
      where: { id: id },
    });
  }
  async getIncomes(where: Prisma.IncomeWhereInput) {
    return this.prisma.income.findMany({
      where: where,
    });
  }
  async getIncome(where: Prisma.IncomeWhereUniqueInput) {
    return this.prisma.income.findUnique({
      where: where,
    });
  }
  async createIncome(data: Prisma.IncomeCreateInput) {
    return this.prisma.income.create({
      data,
    });
  }
  async updateIncome(id: number, data: Prisma.IncomeUpdateInput) {
    return this.prisma.income.update({
      where: { id: id },
      data,
    });
  }
  async deleteIncome(id: number) {
    return this.prisma.income.delete({
      where: { id: id },
    });
  }

  async getExpenses(where: Prisma.ExpenseWhereInput) {
    return this.prisma.expense.findMany({
      where: where,
    });
  }
  async getExpense(where: Prisma.ExpenseWhereUniqueInput) {
    return this.prisma.expense.findUnique({
      where: where,
    });
  }
  async createExpense(data: Prisma.ExpenseCreateInput) {
    return this.prisma.expense.create({
      data,
    });
  }
  async updateExpense(id: number, data: Prisma.ExpenseUpdateInput) {
    return this.prisma.expense.update({
      where: { id: id },
      data,
    });
  }
  async deleteExpense(id: number) {
    return this.prisma.expense.delete({
      where: { id: id },
    });
  }
}

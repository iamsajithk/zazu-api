import { Body, Controller, Post, Res } from '@nestjs/common';
import { USER } from '../decorators/user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SaveAccountDto } from 'src/dtos/save-account.dto';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { SaveIncomeDto } from 'src/dtos/save-income.dto';
import { SaveExpenseDto } from 'src/dtos/save-expense.dto';
import { DeleteAccountDto } from 'src/dtos/delete-account.dto';
import { DeleteIncomeDto } from 'src/dtos/delete-income.dto';
import { DeleteExpenseDto } from 'src/dtos/delete-expense.dto';

@Controller()
export class DataController {
  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private configService: ConfigService,
  ) {}
  @Post('/api/accounts')
  async getAccounts(@Res() res: Response, @USER() user: number): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      accounts: [],
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const accounts = await this.dataService.getAccounts({
        user_id: user,
      });
      if (accounts) {
        response.status = 'success';
        response.message = 'Accounts attached.';
        response.accounts = accounts;
      } else {
        response.message = 'Accounts not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/account/save')
  async saveAccount(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: SaveAccountDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      if (params.id) {
        const isAccountOwner = await this.dataService.getAccount({
          id: params.id,
          user_id: user,
        });
        if (isAccountOwner) {
          const account = await this.dataService.updateAccount(params.id, {
            name: params.name,
            account_balance: params.account_balance,
            minimum_balance: params.minimum_balance,
            user_id: user,
          });
          if (account) {
            response.status = 'success';
            response.message = 'Account updated.';
            response.id = account.id;
          } else {
            response.message = 'Account not updated.';
          }
        } else {
          response.message = 'Account not found.';
        }
      } else {
        const account = await this.dataService.createAccount({
          name: params.name,
          account_balance: params.account_balance,
          minimum_balance: params.minimum_balance,
          user_id: user,
        });
        if (account) {
          response.status = 'success';
          response.message = 'Account created.';
          response.id = account.id;
        } else {
          response.message = 'Account not created.';
        }
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/account/delete')
  async deleteAccount(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: DeleteAccountDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const isAccountOwner = await this.dataService.getAccount({
        id: params.id,
        user_id: user,
      });
      if (isAccountOwner) {
        const account = await this.dataService.deleteAccount(params.id);
        if (account) {
          response.status = 'success';
          response.message = 'Account deleted.';
          response.id = account.id;
        } else {
          response.message = 'Account not deleted.';
        }
      } else {
        response.message = 'Account not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/incomes')
  async getIncomes(@Res() res: Response, @USER() user: number): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      incomes: [],
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const incomes = await this.dataService.getIncomes({
        user_id: user,
      });
      if (incomes) {
        response.status = 'success';
        response.message = 'Incomes attached.';
        response.incomes = incomes;
      } else {
        response.message = 'Incomes not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/income/save')
  async saveIncome(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: SaveIncomeDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      if (params.id) {
        const isIncomeOwner = await this.dataService.getIncome({
          id: params.id,
          user_id: user,
        });
        if (isIncomeOwner) {
          const income = await this.dataService.updateIncome(params.id, {
            name: params.name,
            amount: params.amount,
            user_id: user,
          });
          if (income) {
            response.status = 'success';
            response.message = 'Income updated.';
            response.id = income.id;
          } else {
            response.message = 'Income not updated.';
          }
        } else {
          response.message = 'Income not found.';
        }
      } else {
        const income = await this.dataService.createIncome({
          name: params.name,
          amount: params.amount,
          user_id: user,
        });
        if (income) {
          response.status = 'success';
          response.message = 'Income created.';
          response.id = income.id;
        } else {
          response.message = 'Income not created.';
        }
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/income/delete')
  async deleteIncome(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: DeleteIncomeDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const isIncomeOwner = await this.dataService.getIncome({
        id: params.id,
        user_id: user,
      });
      if (isIncomeOwner) {
        const income = await this.dataService.deleteIncome(params.id);
        if (income) {
          response.status = 'success';
          response.message = 'Income deleted.';
          response.id = income.id;
        } else {
          response.message = 'Income not deleted.';
        }
      } else {
        response.message = 'Income not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }

  @Post('/api/expenses')
  async getExpenses(@Res() res: Response, @USER() user: number): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      expenses: [],
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const expenses = await this.dataService.getExpenses({
        user_id: user,
      });
      if (expenses) {
        response.status = 'success';
        response.message = 'Expenses attached.';
        response.expenses = expenses;
      } else {
        response.message = 'Expenses not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }

  @Post('/api/expense/save')
  async saveExpense(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: SaveExpenseDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      if (params.id) {
        const isExpenseOwner = await this.dataService.getExpense({
          id: params.id,
          user_id: user,
        });
        if (isExpenseOwner) {
          const expense = await this.dataService.updateExpense(params.id, {
            name: params.name,
            amount: params.amount,
            user_id: user,
          });
          if (expense) {
            response.status = 'success';
            response.message = 'Expense updated.';
            response.id = expense.id;
          } else {
            response.message = 'Expense not updated.';
          }
        } else {
          response.message = 'Expense not found.';
        }
      } else {
        const expense = await this.dataService.createExpense({
          name: params.name,
          amount: params.amount,
          user_id: user,
        });
        if (expense) {
          response.status = 'success';
          response.message = 'Expense created.';
          response.id = expense.id;
        } else {
          response.message = 'Expense not created.';
        }
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
  @Post('/api/expense/delete')
  async deleteExpense(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: DeleteExpenseDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      id: null,
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const isExpenseOwner = await this.dataService.getExpense({
        id: params.id,
        user_id: user,
      });
      if (isExpenseOwner) {
        const expense = await this.dataService.deleteExpense(params.id);
        if (expense) {
          response.status = 'success';
          response.message = 'Expense deleted.';
          response.id = expense.id;
        } else {
          response.message = 'Expense not deleted.';
        }
      } else {
        response.message = 'Expense not found.';
      }
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
}

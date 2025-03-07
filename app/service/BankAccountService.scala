package service

import models.NewBankAccount
import repository.{BankAccountRepository, TransactionRepository}

import java.util.UUID

class BankAccountService(
    bankAccountRepository: BankAccountRepository,
    transactionRepository: TransactionRepository
) {

  def getAll() = bankAccountRepository.listAll()

  def create(bankAccount: NewBankAccount) =
    bankAccountRepository.create(bankAccount)

  def findByID(bankID: UUID) = bankAccountRepository.findByID(bankID)

  def findByUserID(userID: UUID) = bankAccountRepository.findByUserID(userID)

  def depositMoney(bankID: UUID, amount: Int) = {
    bankAccountRepository.depositMoney(bankID, amount)
  }

  def withdrawMoney(bankID: UUID, amount: Int) =
    bankAccountRepository.withdrawMoney(bankID, amount)
}

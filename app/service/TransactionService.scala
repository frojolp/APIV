package service

import repository.TransactionRepository

import java.util.UUID

class TransactionService(transactionRepository: TransactionRepository) {

  def getAll() = transactionRepository.listAll()

  def findByID(transactionID: UUID) =
    transactionRepository.findbyID(transactionID)

  def create(accountID: UUID, transaction: String, amount: Int) =
    transactionRepository.create(accountID, transaction, amount)

  def findByBankID(bankID: UUID) = transactionRepository.findByBankID(bankID)

}

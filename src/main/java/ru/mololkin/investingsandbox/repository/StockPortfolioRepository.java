package ru.mololkin.investingsandbox.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mololkin.investingsandbox.entitiy.StockPortfolioEntity;

public interface StockPortfolioRepository extends JpaRepository<StockPortfolioEntity, Long> {
}

package ru.mololkin.investingsandbox.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;

public interface StockPortfolioRepository extends JpaRepository<StockPortfolioEntity, Long> {
}

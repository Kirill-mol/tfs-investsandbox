package ru.mololkin.investingsandbox.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * Portfolio unit entity.
 *
 * @author Mololkin Kirill
 */
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "protfolio_unit")
@EqualsAndHashCode(callSuper = true)
public class PortfolioUnitEntity extends BaseEntity{
    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "balance")
    private String ticker;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "stock_portfolio_id")
    private StockPortfolioEntity stockPortfolio;
}

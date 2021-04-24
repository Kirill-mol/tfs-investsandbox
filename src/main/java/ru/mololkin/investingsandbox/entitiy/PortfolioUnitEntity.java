package ru.mololkin.investingsandbox.entitiy;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @NotNull
    @Column(name = "shortname")
    private String shortname;

    @NotNull
    @Column(name = "symbol")
    private String symbol;

    @NotNull
    @Column(name = "exchange")
    private String exchange;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private Currency currency;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "price")
    private Double price;

    @ManyToOne
    private StockPortfolioEntity stockPortfolio;
}

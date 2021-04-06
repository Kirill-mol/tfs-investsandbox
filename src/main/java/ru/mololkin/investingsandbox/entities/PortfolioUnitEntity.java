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
    @Column(name = "name")
    private String name;

    @Column(name = "ticker")
    private String ticker;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    private StockPortfolioEntity stockPortfolio;
}

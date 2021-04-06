package ru.mololkin.investingsandbox.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * Stock portfolio entity. Each user can have many portfolio.
 *
 * @author Mololkin Kirill
 */

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "stock_portfolio")
@EqualsAndHashCode(callSuper = true)
public class StockPortfolioEntity extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "balance")
    private Long balance;

    @ManyToOne
    private UserEntity user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "stock_portfolio_id")
    private List<PortfolioUnitEntity> portfolioUnits;
}

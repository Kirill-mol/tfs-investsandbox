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

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "balance")
    private Long balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity usr;

    @OneToMany(mappedBy = "stockPortfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioUnitEntity> portfolioUnits;
}

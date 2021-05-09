package ru.mololkin.investingsandbox.entitiy;

import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	@NotNull
	@Column(name = "name")
	private String name;

	@NotNull
	@Column(name = "balance")
	private Double balance;

	@NotNull
	@Column(name = "start_balance")
	private Double startBalance;

	@NotNull
	@Column(name = "currency")
	@Enumerated(EnumType.STRING)
	private Currency currency;

	@ManyToOne
	private UserEntity user;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "stock_portfolio_id")
	private List<PortfolioUnitEntity> portfolioUnits;

	@Builder.Default
	@LazyCollection(LazyCollectionOption.FALSE)
	@ElementCollection(targetClass = Double.class)
	@CollectionTable(name = "month_history", joinColumns = @JoinColumn(name = "stock_portfolio_id"))
	private Map<Integer, Double> monthHistory = new HashMap<>();

	@Builder.Default
	@LazyCollection(LazyCollectionOption.FALSE)
	@ElementCollection(targetClass = Double.class)
	@CollectionTable(name = "all_time_history", joinColumns = @JoinColumn(name = "stock_portfolio_id"))
	private Map<Integer, Double> allTimeHistory = new HashMap<>();
}

package ru.mololkin.investingsandbox.entities;

import lombok.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * User entity.
 *
 * @author Mololkin Kirill
 */

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usr")
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends BaseEntity {

    @Email
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "username")
    private String username;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    private Set<Role> roles;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private List<StockPortfolioEntity> portfolios;
}




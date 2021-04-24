package ru.mololkin.investingsandbox.entitiy;

import lombok.Data;

import javax.persistence.*;

/**
 * Base entity. All entities must extends from this class.
 *
 * @author Mololkin Kirill
 */
@Data
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

}

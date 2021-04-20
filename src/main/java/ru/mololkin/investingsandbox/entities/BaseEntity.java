package ru.mololkin.investingsandbox.entities;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

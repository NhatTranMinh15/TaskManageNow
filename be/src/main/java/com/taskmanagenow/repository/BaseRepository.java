package com.taskmanagenow.repository;

import com.taskmanagenow.model.abtract.BaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BaseRepository<M extends BaseModel, ID> extends JpaRepository<M, ID>, JpaSpecificationExecutor<M> {

}

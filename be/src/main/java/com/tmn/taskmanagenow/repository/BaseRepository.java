

package com.tmn.taskmanagenow.repository;

import com.tmn.taskmanagenow.model.BaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface BaseRepository<M extends BaseModel, ID> extends JpaRepository<M, ID>, JpaSpecificationExecutor<M>{

}



package com.taskmanagenow.repository;

import com.taskmanagenow.model.User;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;


public interface UserRepository extends BaseRepository<User, UUID>{
    Page<User> findAllByUsernameLikeIgnoreCase(String username, PageRequest pageRequest);
}

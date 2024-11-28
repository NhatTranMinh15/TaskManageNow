package com.taskmanagenow.repository;

import com.taskmanagenow.model.Comment;
import com.taskmanagenow.model.Task;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends BaseRepository<Comment, UUID> {

//    @Query(value = "select c from Comment c join fetch c.createdUser where c.task.id = :taskId")
    @Query(value = "select c from Comment c where c.task.id = :taskId")
    public Page<Comment> findAllByTaskId(@Param("taskId") UUID id, Pageable pagable);

//    @Query(value = "select c from Comment c join fetch c.createdUser where c.createdUser.id = :userId")
    @Query(value = "select c from Comment c where c.createdBy = :userId")
    public Page<Comment> findAllByUserId(@Param("userId") UUID id, Pageable pagable);

    public Page<Comment> findAllByTask(Task task, Pageable pagable);
}

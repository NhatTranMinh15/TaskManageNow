package com.taskmanagenow.repository;

import com.taskmanagenow.dto.query.BlogPreviewDTO;
import com.taskmanagenow.model.Blog;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BlogRepository extends BaseRepository<Blog, UUID> {

    @Query(value = "select b from Blog b join fetch b.categories bc join fetch bc.category where b.slug = ?1")
    Optional<Blog> findBySlug(String slug);

    @Query(value = "select b from Blog b join fetch b.categories")
    Page<BlogPreviewDTO> findAllPreviews(Pageable pageable);

    @Query(value = "UPDATE Blog b set b.views = :views WHERE b.id = :id")
    @Modifying
    Blog updateView(@Param("id") UUID id, @Param("views") int views);
}

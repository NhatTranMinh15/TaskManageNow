package com.tmn.taskmanagenow.specification;

import com.tmn.taskmanagenow.dto.request.TaskGetRequest;
import com.tmn.taskmanagenow.model.Task;
import com.tmn.taskmanagenow.model.Task_;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {

//    public static Specification<Task> withCategoryIn(List<Long> category_id) {
//        return (root, query, builder) -> {
//            if (category_id == null) {
//                return builder.conjunction();
//            }
//
//            return root.<Category>get("category").get("id").in(category_id);
//        };
//    }
    public static Specification<Task> withStatusIn(List<String> statuses) {
        return (root, query, builder) -> {
            if (statuses == null) {
                return builder.conjunction();
            }
            return root.get(Task_.STATUS).in(statuses);
        };
    }

    public static Specification<Task> summaryLike(String summary) {
        return (root, query, builder) -> {
            if (summary == null) {
                return builder.conjunction();
            }
            return builder.like(builder.lower(root.get(Task_.SUMMARY)), "%" + summary.toLowerCase() + "%");
        };
    }

    public static Specification<Task> descriptionLike(String description) {
        return (root, query, builder) -> {
            if (description == null) {
                return builder.conjunction();
            }
            return builder.like(builder.lower(root.get(Task_.DESCRIPTION)), "%" + description.toLowerCase() + "%");
        };
    }

//    public static Specification<Task> join() {
//        return (root, query, builder) -> {
//            if (Long.class != query.getResultType()) {
//                root.fetch(Task_.CATEGORY, JoinType.LEFT);
//            }
//            return builder.conjunction();
//
//        };
//    }
    public static Specification<Task> filterSpecs(TaskGetRequest request) {
//        return join().and(locationAt(location)).and(nameLike(search).or(assetCodeLike(search))).and(withCategoryIn(category_id)).and(withStatesIn(states));
        return summaryLike(request.getSummary()).and(descriptionLike(request.getDescription()));
    }
}

package com.taskmanagenow.dto.request;

import com.taskmanagenow.util.constant.General;
import com.taskmanagenow.util.constant.Priority;
import com.taskmanagenow.util.constant.Status;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TaskGetRequest {

    private String summary = "";
    private String description = "";
    private LocalDateTime createdFrom = General.minDateTime;
    private LocalDateTime createdTo = LocalDateTime.now();
    private Boolean all = false;
    private List<Status> status;
    private List<Priority> priority;
    private String junctionType = "AND";

    public void setSummary(String summary) {
        if (summary != null) {
            this.summary = summary;
        }
    }

    public void setDescription(String description) {
        if (description != null) {
            this.description = description;
        }
    }

    public void setCreatedFrom(LocalDateTime createdFrom) {
        if (createdFrom != null) {
            this.createdFrom = createdFrom;
        }
    }

    public void setCreatedTo(LocalDateTime createdTo) {
        if (createdTo != null) {
            this.createdTo = createdTo;
        }
    }

    public void setAll(Boolean all) {
        if (all != null) {
            this.all = all;
        }
    }

    public void setJunctionType(String junctionType) {
        if (junctionType != null && junctionType.equals("OR")) {
            this.junctionType = junctionType;
        }
    }
}

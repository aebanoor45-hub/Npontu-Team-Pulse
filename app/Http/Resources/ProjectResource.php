<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'due_date' => $this->due_date,
            'remarks' => $this->remarks,
            'created_at' => $this->created_at,
            'last_edited_at' => $this->last_edited_at,
            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->id,
                'name' => $this->createdBy->name,
            ] : null,
            'last_edited_by' => $this->lastEditedBy ? [
                'id' => $this->lastEditedBy->id,
                'name' => $this->lastEditedBy->name,
            ] : null,
        ];
    }
}

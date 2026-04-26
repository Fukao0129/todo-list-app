<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'description' => $this->resource->description,
            'user_id' => $this->resource->user_id,
            'status_id' => $this->resource->status_id,
            'due_date' => $this->resource->due_date,
            'priority' => $this->resource->priority,
            'is_trashed' => $this->resource->is_trashed,
            'completed_at' => $this->resource->completed_at,
            'reminder_at' => $this->resource->reminder_at,
            'reminder_sent_at' => $this->resource->reminder_sent_at,
            'status' => new StatusResource($this->resource->status),
        ];
    }
}

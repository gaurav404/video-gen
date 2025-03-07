export type Doubt = {
    id: string;
    text: string;
    image: string
    isActive: boolean;
    timestamp: string;
    status: string;
};

export type ContentRes = {
    status: number,
    doubt_id: string,
    content_data: ContentData[]
}

export type ContentData = {
    type: number,
    content_url: string,
    subtitle_url: string,
    meta_map: unknown
}
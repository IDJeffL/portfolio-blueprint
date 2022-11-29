export interface SeedNode {
    __typename?: string;
    uri?: string;
    id?: string;
    databaseId?: string;
    mimeType?: string;
    name?: string;
    isFrontPage?: boolean;
    isPostsPage?: boolean;
    isTermNode?: boolean;
    slug?: string;
    taxonomyName?: string;
    isContentNode?: boolean;
    contentType?: {
        node?: {
            name?: string;
        };
    };
    template?: {
        templateName?: string;
    };
    userId?: number;
}
export declare const SEED_QUERY: import("@apollo/client").DocumentNode;

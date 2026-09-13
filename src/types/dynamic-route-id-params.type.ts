/**
 * Next 16-e `params` ekhon Promise — sync kore `params.id` porle `undefined`
 * pawa jay ar page faka dekhay. Tai type-tao Promise kore rakha hocche.
 */
export type DynamicRouteIdParams = {
  params: Promise<{ id: string }>;
};

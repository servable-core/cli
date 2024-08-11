
/**
* @description
beforeDelete

You can run custom Cloud Code before an object is deleted.
You can do this with the beforeDelete method.
For instance, this can be used to implement a restricted delete policy that is more sophisticated than what can be expressed through ACLs.
For example, suppose you have a photo album app, where many photos are associated with each album, and you want to prevent the user from deleting an album if it still has a photo in it.

https://docs.servable.app/docs/protocols/api/triggers
https://docs.parseplatform.org/cloudcode/guide/#delete-triggers

*/
export default async ({ request }) => {

}

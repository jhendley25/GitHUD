// if an ENV object has app keys in it, use those
GitHUD.utilities.keys = function(){
  return ENV ? '?client_id=' + ENV.clientId + '&client_secret=' + ENV.clientSecret + '&per_page=100' : '';
}
// if an ENV object has app keys in it, use those
GitHUD.utilities.keys = function(){
  return GitHUD.access_token ? '?access_token=' + GitHUD.access_token + '&per_page=100' : '';
}

GitHUD.utilities.colorTable = {};

GitHUD.utilities.color = function(username){
    // var pallete = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"] 

    var pallete = [
      '#B82424', // red
      '#13747D', // blue
      '#981F6E', // purple
      '#777CD8', // lighter purple
      '#AADCD3', // mint
      '#FF7431', // orange
      '#6DDD7E', // green
      '#FBA625', // gold
      '#B3CC57', // lighter green
      '#EF746F', // rose
      '#AB3E5B', // raspberry
      ]
    return GitHUD.utilities.colorTable[username] || (GitHUD.utilities.colorTable[username] = _.sample(pallete))
}


// thanks to http://www.sitepoint.com/javascript-generate-lighter-darker-color/
GitHUD.utilities.colorLuminance = function (hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}
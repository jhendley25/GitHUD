 <div class="legend">

    <% _.each(repo.get('gitHUDMeta').contributors, function(contributor, i) { %>
      <p style="color: <%= repo.get('gitHUDMeta').donutData.color %>;"><%= contributor.login %> <%= repo.get('gitHUDMeta').commits[i] %></p>
    <% }) %>
  </div>
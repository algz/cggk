
 Seam.Component.getInstance("news_newsserver").getNewDate1(function(news)
 {
  document.getElementById("news").innerHTML=news;
 });
 
 
 Seam.Component.getInstance("meetings_meetingsserver").getMeetings1(function(meetings)
 {
  document.getElementById("meeting").innerHTML=meetings;
 });
 
 Seam.Component.getInstance("notices_noticesserver").getNotices1(function(notices)
 {
  document.getElementById("notice").innerHTML=notices;
 }); 

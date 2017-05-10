$('.menu').affix({
  offset: {
    top: function() { return $('.banner').height(); }
  }
});


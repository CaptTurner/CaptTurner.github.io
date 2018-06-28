$(function () {
  let socket = io();
  let name = '';
  let nameInput = $('#name-input');
  let chatInput = $('#chat-input');

  // handle name bint entered with the ceyboard
  nameInput.keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();

      //make sure the name field isn't empty
      if (nameInput.val() !== '') {
        name = nameInput.val();
        nameInput.val('');
        $('.enter-name').hide();
        socket.emit('new:member', name);
      }
    }
  });
  //handle name being entered with submit button
  $('.submit-name').on('click', function(event) {
    event.preventDefault();

    //make sure the name field isn't empty
    if (nameInput.val() !== '') {
      name = nameInput.val();
      nameInput.val('');
      $('.enter-name').hide();
      socket.emit('new:member', name);
    }
  });

  // handle chat message input via keyboard enter button
  chatInput.keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();

      // ensure the chat message is not empty
      // add alert
      if (chatInput.val() !== '' && name !== '') {
        socket.emit('new:message', {name: name, msg: chatInput.val()});
        chatInput.val('');
      }
    }
  });

  // handle new chat message via submit button
  $('.subit-chat-message').on('click', function(event) {
    event.preventDefault();

    // ensure the message and name are not empty
    // ensure the chat message is not empty
    if (chatInput.val() !== '' && name !== '') {
      socket.emit('new:message', {name: name, msg: chatInput.val()});
      chatInput.val('');
    }
  });

  // handle receiving new messages
  socket.on('new:message', function(msgObject){
    $('#messages').append($('<div class="msg new-chat-message">').html('<span class="member-name">' + msgObject.name + '</span>: ' +msgObject.msg));
    $('.chat-window').scrollTop($('#messages').height());
  });

  // handle members joining
  socket.on('new:member', function(name){
    $('#messages').append($('<div class="msg new-member">').text(name + ' has joind the room'));
    $('.chat-window').scrollTop($('#messages').height());
  });
});

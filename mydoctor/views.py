from pyramid.response import Response
from pyramid.view import view_config


@view_config(route_name='home')
def home(request):
    # Simple page for distribution
    # TODO implement logging
    return Response("""<body style="text-align:center;" >
                    <h1>
                    Are you a
                    <a href="/doctor">doctor</a> or a
                    <a href="/patient">patient</a>
                    ?
                    </h1>
                    </body>""")


@view_config(route_name='cabinet', renderer='templates/cabinet.mako')
def cabinet(request):
    # TODO get jid and pass from base
    if 'doctor' in request.url:
        jid = 'doctor'
        tojid = 'patient@blah.im '
        vid = 'doctor '
    else:
        jid = 'patient'
        tojid = 'doctor@blah.im '
        vid = 'patient '

    return {'jid': jid + '@blah.im ',
            'jidpass': '123 ',
            'tojid': tojid,
            'vid': vid}


# TODO use this for video server back-end
# def chat(room):
#     doc = '123'
#     initiator = 1
#     if not doc:
#         initiator = 0
#         doc = {'_id':room, 'mess': []}
#         db.chat.save(doc)
#     return templ('rtc.tpl', initiator = initiator, room=room)
#
#
# def chat_post():
#     lst = 0.0
#     msg = []
#     room = get_post('room')
#     user_id= get_post('user_id')
#     last= float(get_post('last', 0))
#     mess= get_post('mess')
#     doc = db.chat.find_one({'_id':room})
#     if mess:
#         doc['mess'].append((time.time(), mess, user_id))
#         db.chat.save(doc)
#     for i_time, i_msg, i_user in doc['mess']:
#         if i_user != user_id and i_time > last:
#             lst = i_time
#             msg.append((i_time, i_user, i_msg))
#     if not lst: lst = last
#     return json.dumps({'result': 'ok', 'last': lst, 'msg': msg})

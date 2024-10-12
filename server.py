from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/panel')
def panel():
    return render_template('panel.html')

@app.route('/load/<value>')
def load(value):
    return render_template('loadscreen.html', value=value)

@app.route('/sound/<path:filename>')
def serve_sound(filename):
    return send_from_directory('static/sounds', filename)

@app.route('/image/<path:filename>')
def serve_iamge(filename):
    return send_from_directory('static/images', filename)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
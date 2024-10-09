from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/load/<value>')
def load(value):
    return render_template('loadscreen.html', value=value)

@app.route('/notify')
def notify():
    title = request.args.get('title', 'INFO')
    description = request.args.get('description', 'Empty description')
    return render_template('notification.html', title=title, description=description)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
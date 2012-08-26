sys = require 'sys'
exec = (require 'child_process').exec

FILENAME = 'game'
FILES = [
  'coffee/game.coffee',
  'coffee/titleScene.coffee',
  'coffee/jobSelectScene.coffee',
  'coffee/player.coffee',
  'coffee/fieldScene.coffee',
  'coffee/battleScene.coffee',
  'coffee/util.coffee',
]
HTMLFILE = 'index.html'

task 'compile', 'compile Quest', (options) ->
  outputErr = (err, stdout, stderr) ->
    throw err if err
    if stdout or stderr
      console.log "#{stdout} #{stderr}"
  if FILES.length is 1
    exec "coffee -c #{FILENAME}.js #{FILES[0]}", outputErr
  else
    exec "coffee -cj #{FILENAME} #{FILES.join ' '}", outputErr 

require 'fileutils'
require 'rake'

$stdout = File.new('/dev/null', 'w')

def recent_files(touched_since)
  pwd = Dir.pwd
  Dir.glob('../**/*.js').map do |path|
    if File.mtime(path) > touched_since
      Dir.chdir(File.dirname(path))
      system "rake default"
      Dir.chdir(pwd)
    end
  end
end

loop do
  recent_files(Time.now - 2) # after two second	
  sleep 2
end

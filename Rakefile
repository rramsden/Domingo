require 'rake'
require 'yaml'
require 'tempfile'
require 'fileutils'
include FileUtils

LOAD_ORDER = ["src/lib/jquery-1.4.2.min.js","src/lib/inheritance.js","src/domingo.js"]
DOMINGO_FILES = Dir.glob("#{Dir.pwd}/src/**/*.js").collect { |path| path.sub(Dir.pwd, '') unless LOAD_ORDER.join('').to_s.include?(path.split('/').last) }.compact
JSMIN = "script/jsmin.rb"

desc "Package Domingo source files"
task :default do
  Rake::Task["compile"].invoke
  Rake::Task["widget"].invoke
end

desc "Compile widgets"
task :widget do
  next if not_project_dir? || no_widgets?
  templates = []
  Dir.glob("#{Rake.original_dir}/widgets/**/*.html").each do |name|
    templates << %{
      function _#{name.split("/").last.split('.').join('_')}() {
        return #{File.open(name, "r").read().dump};
      }
    }
  end
  File.open("#{Rake.original_dir}/bin/debug/widgets.js", "w").write(templates.join(''))
end

desc "Minify javascript for production environment"
task :minify do
  output = "script/domingo.min.js"

  # create a tmp file
  tmp = Tempfile.new("tmp")
  DOMINGO_FILES.each { |lib| open(lib) { |f| tmp.write(f.read) } }
  tmp.rewind

  # min file
  %x[ruby #{JSMIN} < #{tmp.path} > #{output}]
  puts "\n#{output}"
end

desc "Compile a Domingo Project"
task :compile do
  next if not_project_dir?
  create_if_missing("#{Rake.original_dir}/bin/release")
  create_if_missing("#{Rake.original_dir}/bin/debug/src") 
  entry_point = nil
  libs = []
 
  Dir.glob("#{Rake.original_dir}/**/*.js") do |name|
    libs << name
    entry_point = name if name =~ /(main.js)/i
  end

  throw "Your Domingo project requires a Main.js file" unless entry_point

  result = ""
  order = load_order(entry_point)
  order.reverse.each do |f|
    body = File.open(f, "r").read().gsub(/include\([\"\'](.*)[\"|\']\)./, '')
    File.open("#{Rake.original_dir}/bin/debug/#{f.split('/').last}", "w").write(body)
    result += body
  end

  tmp = Tempfile.new("game.js"); tmp.write(result); tmp.rewind
  %x[ruby #{JSMIN} < #{tmp.path} > #{Rake.original_dir}/bin/release/game.js]
  cp_r "#{Dir.pwd}/src", "#{Rake.original_dir}/bin/debug"

  script_tags = LOAD_ORDER.collect {|path| "<script src=\"bin/debug/#{path.gsub(Rake.original_dir, '')}\"></script>" }.join("\n\t")
  script_tags << DOMINGO_FILES.collect {|path| "<script src=\"bin/debug#{path.gsub(Rake.original_dir, '')}\"></script>" }.join("\n\t")
  script_tags << order.reverse.collect {|path| "<script src=\"bin/debug/#{path.split('/').last}\"></script>" unless path =~ /main.js/i }.join("\n\t")
  create_debug_template(script_tags)
end

# recusively find dependencies for javascript files
def load_order(path, loaded = [path])
  File.open(path, "r") do |fh|
    while(line = fh.gets)
      if line =~ /include\([\"\'](.*)[\"|\']\)/
        file = "#{File.dirname(fh)}/#{$1.to_s}"
	loaded = load_order(file, loaded.push(file)) if loaded.include?(file) == false
      end
    end
    return loaded
  end
end

def create_debug_template(script_tags)
  template = %{
	<html>
	<head>
		<link rel="stylesheet" type="text/css" href="widgets/classic.css"/>
		#{script_tags}
	<head>
	<body>
		<div id="container">
			<div id="game"></div>
		</div>
		<script src="bin/debug/widgets.js"></script>
		<script src="bin/debug/Main.js"></script>
	</body>
	</html>
  }
  File.open("#{Rake.original_dir}/index.html", "w").write(template)
end

def create_if_missing(path)
  mkdir_p(path) unless File.directory?(path)
end

def not_project_dir?
  Dir.glob("#{Rake.original_dir}/Main.js").empty?
end

def no_widgets?
  Dir.glob("#{Rake.original_dir}/widgets/*").empty?
end

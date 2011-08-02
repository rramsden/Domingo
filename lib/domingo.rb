require 'yaml'
require 'fileutils'
require 'sprockets'

module Domingo
  VERSION="1.0.0" 
  DOMINGO_GEM_PATH = File.expand_path(File.dirname(__FILE__) + "/../")
  
  class << self
    def project_dir?
      ['main.js','Main.js','main.coffee','Main.coffee'].detect{|path| File.exist?( path )}
    end

    ##
    # creates a new project with the name +project+ in
    # the current directory.
    def create( project )
      project_dir = "#{Dir.getwd}/#{project}"
      FileUtils.mkdir( project_dir ) 
      FileUtils.cp_r File.join( File.dirname(__FILE__), "../static/template/." ), project_dir
    end

    def compile
      if project_dir? 
        env = Sprockets::Environment.new
        env.append_path( "#{DOMINGO_GEM_PATH}/src/coffee" )
        env.append_path( Dir.pwd )
        compiled_str = "var Domingo = Domingo || {};\n" 
        compiled_str << env["domingo"].to_s
        compiled_str << env["Main.coffee"].to_s

        File.open("Domingo.js", "w").write( compiled_str )        
      end
    end

  end
end

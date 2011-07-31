require 'yaml'
require 'fileutils'

module Domingo
  VERSION="1.0.0"
  
  autoload :Compiler, "domingo/compiler"

  class << self
    def project_dir?
      File.exist?("Main.js") or File.exist?("Main.coffee")
    end

    ##
    # creates a new project with the name +project+ in
    # the current directory.
    def create( project )
      project_dir = "#{Dir.getwd}/#{project}"
      FileUtils.mkdir( project_dir ) 
      FileUtils.cp_r File.join( File.dirname(__FILE__), "../static/template/." ), project_dir
    end
  end
end

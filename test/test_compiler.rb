require 'helper'

class TestDomingo < Test::Unit::TestCase

  def test_that_it_builds_coffee_script_files
    inside_a_project do
      mtimes = {} 
      js_build_path = Dir.glob( File.join( project_dir, "src/js/**/*.js"  ) )
      js_build_path.each {|file| mtimes[file] = open(file).mtime}
      Domingo::Compiler.compile
      js_build_path.each {|file| assert mtimes[file] != open(file).mtime} 
    end
  end

  def test_project_source_files_are_compiled
    inside_a_project do
      assert !File.exist?("build/domingo.js")
      Domingo::Compiler.compile
      assert File.exist?("build/domingo.js")
    end
  end
end

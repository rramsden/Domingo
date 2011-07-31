require 'helper'

module Kernel
  def gets
    "Sapphire Skies"
  end
end

class TestDomingo < Test::Unit::TestCase
  def test_project_generation 
    with_temporary_directory do |path|
      Dir.chdir( path )
      Domingo.create( "sapphire" )
      assert File.exist?( "#{path}/sapphire/Main.js" )
      assert File.exist?( "#{path}/sapphire/PlayState.js" )
      assert File.exist?( "#{path}/sapphire/config.yml" )

      config = YAML.load( open("#{path}/sapphire/config.yml").read )
    end
  end
end

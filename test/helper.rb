require 'rubygems'
require 'bundler'
begin
  Bundler.setup(:default, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'test/unit'
require 'shoulda'

$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
$LOAD_PATH.unshift(File.dirname(__FILE__))

require 'tmpdir'
require 'domingo'

class Test::Unit::TestCase

  def project_dir
    File.join( File.dirname(__FILE__), ".." )
  end

  def with_temporary_directory
    path = File.join(Dir.tmpdir, [caller[0][/`(.*)'/, 1], Time.now.to_f].join("_"))
    begin
      FileUtils.mkdir(path)
      yield path
    ensure
      FileUtils.rm_rf(path)
    end
  end

  def inside_a_project
    with_temporary_directory do |path|
      Dir.chdir( path )
      Domingo.create( "test" )
      Dir.chdir( "#{path}/test" )
      yield
    end
  end

end

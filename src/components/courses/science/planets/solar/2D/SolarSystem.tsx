import { useEffect, useRef } from 'react';
import './solar.css'; // Your original CSS file
import $ from 'jquery';

export default function SolarSystem() {
  const bodyRef = useRef<HTMLElement | null>(null);
  const solarSystemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $body = $('body');
    const $universe = $('#universe');
    const $solarSystem = $('#solar-system');

    // Initialization
    const init = () => {
      $body.removeClass('view-2D opening').addClass('view-3D');
      setTimeout(() => {
        $body.removeClass('hide-UI').addClass('set-speed');
      }, 2000);
    };

    const setView = (view: string) => {
      $universe.removeClass().addClass(view);
    };

    $('#toggle-data').on('click', (e) => {
      $body.toggleClass('data-open data-close');
      e.preventDefault();
    });

    $('#toggle-controls').on('click', (e) => {
      $body.toggleClass('controls-open controls-close');
      e.preventDefault();
    });

    $('#data a').on('click', function (e) {
      const ref = $(this).attr('class');
      $solarSystem.removeClass().addClass(ref || '');
      $(this).parent().find('a').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });

    $('.set-view').on('click', () => $body.toggleClass('view-3D view-2D'));
    $('.set-zoom').on('click', () => $body.toggleClass('zoom-large zoom-close'));
    $('.set-speed').on('click', () => setView('scale-stretched set-speed'));
    $('.set-size').on('click', () => setView('scale-s set-size'));
    $('.set-distance').on('click', () => setView('scale-d set-distance'));

    init();
  }, []);

  return (
    <div id="app">
      <nav id="navbar">
        <a id="toggle-data" href="#data"><i className="icon-data" />Data</a>
        <a id="toggle-controls" href="#controls"><i className="icon-controls" />Controls</a>
      </nav>

      <div id="data">
        {['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].map((planet, i) => (
          <a key={i} className={planet + (planet === 'earth' ? ' active' : '')} href={`#${planet}speed`} title={planet}>
            {planet.charAt(0).toUpperCase() + planet.slice(1)}
          </a>
        ))}
      </div>

      <div id="controls">
        <label className="set-view"><input type="checkbox" /></label>
        <label className="set-zoom"><input type="checkbox" /></label>
        <label>
          <input type="radio" className="set-speed" name="scale" defaultChecked />
          <span>Speed</span>
        </label>
        <label>
          <input type="radio" className="set-size" name="scale" />
          <span>Size</span>
        </label>
        <label>
          <input type="radio" className="set-distance" name="scale" />
          <span>Distance</span>
        </label>
      </div>

      <div id="universe" className="scale-stretched">
        <div id="galaxy">
          <div id="solar-system" ref={solarSystemRef} className="earth">
            {['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].map((planet) => (
              <div key={planet} id={planet} className="orbit">
                <div className="pos">
                  {planet === 'earth' && (
                    <div className="orbit">
                      <div className="pos">
                        <div className="moon" />
                      </div>
                    </div>
                  )}
                  <div className="planet">
                    {planet === 'saturn' && <div className="ring" />}
                    <dl className="infos">
                      <dt>{planet.charAt(0).toUpperCase() + planet.slice(1)}</dt>
                      <dd><span /></dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
            <div id="sun">
              <dl className="infos">
                <dt>Sun</dt>
                <dd><span /></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

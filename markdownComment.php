<?php if(!defined('PLX_ROOT')) exit;
		/**
		* Plugin 			markdownComment
		*
		* @CMS required			PluXml 
		*
		* @version			1.0
		* @date				2024-09-13
		* @author 			pluxthemes
		░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
		░       ░░  ░░░░░░░  ░░░░  ░  ░░░░  ░░      ░░       ░░░      ░░  ░░░░░░░        ░░      ░░░░░   ░░░  ░        ░        ░
		▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒  ▒▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒    ▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
		▓       ▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓    ▓▓▓  ▓▓▓▓  ▓       ▓▓  ▓▓▓▓  ▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓  ▓  ▓  ▓      ▓▓▓▓▓▓  ▓▓▓▓
		█  ███████  ███████  ████  ██  ██  ██  ████  █  ███████  ████  █  ██████████  ██████████  ████  ██    █  ██████████  ████
		█  ███████        ██      ██  ████  ██      ██  ████████      ██        █        ██      ██  █  ███   █        ████  ████
		█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
		**/
		class markdownComment extends plxPlugin {

		const BEGIN_CODE = '<?php' . PHP_EOL;
		const END_CODE = PHP_EOL . '?>';
		public $lang = ''; 
		
		
		public function __construct($default_lang) {
		# appel du constructeur de la classe plxPlugin (obligatoire)
		parent::__construct($default_lang);

		# Declaration des hooks		
		//$this->addHook('AdminTopBottom', 'AdminTopBottom');
		$this->addHook('ThemeEndHead', 'ThemeEndHead');
		$this->addHook('ThemeEndBody', 'ThemeEndBody');
		}

		public function ThemeEndHead() {
			#gestion multilingue
			if(defined('PLX_MYMULTILINGUE')) {		
				$plxMML = is_array(PLX_MYMULTILINGUE) ? PLX_MYMULTILINGUE : unserialize(PLX_MYMULTILINGUE);
				$langues = empty($plxMML['langs']) ? array() : explode(',', $plxMML['langs']);
				$string = '';
				foreach($langues as $k=>$v)	{
					$url_lang="";
					if($_SESSION['default_lang'] != $v) $url_lang = $v.'/';
					$string .= 'echo "\\t<link rel=\\"alternate\\" hreflang=\\"'.$v.'\\" href=\\"".$plxMotor->urlRewrite("?'.$url_lang.$this->getParam('url').'")."\" />\\n";';
				}
				echo '<?php if($plxMotor->mode=="'.$this->getParam('url').'") { '.$string.'} ?>';
			}
			
			
			// ajouter ici vos propre codes (insertion balises link, script , ou autre)
		}
		
		/**
		 * Méthode qui affiche un message si le plugin n'a pas la langue du site dans sa traduction
		 * Ajout gestion du wizard si inclus au plugin
		 * @return	stdio
		 * @author	Stephane F
		 **/
		public function AdminTopBottom() {

			echo '<?php
			$file = PLX_PLUGINS."'.$this->plug['name'].'/lang/".$plxAdmin->aConf["default_lang"].".php";
			if(!file_exists($file)) {
				echo "<p class=\\"warning\\">'.basename(__DIR__).'<br />".sprintf("'.$this->getLang('L_LANG_UNAVAILABLE').'", $file)."</p>";
				plxMsg::Display();
			}
			?>';
		}
		
		/** 
		* Méthode ThemeEndBody
		* 
		* Descrition	:
		* @author		: TheCrok
		* 
		**/
		public function ThemeEndBody() {
		# code à executer
		echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">'.PHP_EOL;
		echo '<link rel="stylesheet" type="text/css" href="'.PLX_PLUGINS.'markdownComment/css/markdownComment.css"/>'.PHP_EOL;
		echo '<script src="'.PLX_PLUGINS.'markdownComment/js/markdownComment.js" defer></script>'.PHP_EOL;
		echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/14.0.0/marked.min.js"></script>'.PHP_EOL;
		echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js"></script>'.PHP_EOL;
		
		echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">'.PHP_EOL;
		echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>'.PHP_EOL;
		echo '<script>hljs.highlightAll();</script>'.PHP_EOL;
	
		}
		
		}